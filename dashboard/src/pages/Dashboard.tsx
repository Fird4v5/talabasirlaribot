import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Confession } from "../confession";

const FILTERS = ["pending", "approved", "posted"] as const;
type Filter = typeof FILTERS[number];

type ConfessionDoc = Confession & { id: string };

export default function Dashboard() {
  const [filter, setFilter] = useState<Filter>("pending");
  const [confessions, setConfessions] = useState<ConfessionDoc[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    posted: 0,
    total: 0,
  });

  useEffect(() => {
    fetchConfessions(filter);
  }, [filter]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchConfessions = async (status: Filter) => {
    const q = query(
      collection(db, "confessions"),
      where("status", "==", status),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConfessionDoc[];
    setConfessions(data);
  };

  const fetchStats = async () => {
    const counts: any = { pending: 0, approved: 0, posted: 0, total: 0 };
    const statuses: Filter[] = ["pending", "approved", "posted"];

    await Promise.all(
      statuses.map(async (status) => {
        const q = query(collection(db, "confessions"), where("status", "==", status));
        const snap = await getDocs(q);
        counts[status] = snap.size;
      })
    );

    const allDocs = await getDocs(collection(db, "confessions"));
    counts.total = allDocs.size;

    setStats(counts);
  };

  const handleApprove = async (id: string) => {
    await updateDoc(doc(db, "confessions", id), { status: "approved" });
    fetchConfessions(filter);
    fetchStats();
  };

  const handleMarkPosted = async (id: string) => {
    await updateDoc(doc(db, "confessions", id), { status: "posted" });
    fetchConfessions(filter);
    fetchStats();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "confessions", id));
    fetchConfessions(filter);
    fetchStats();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 text-center text-sm text-gray-600">
        <p>
          Total: {stats.total} | 🟡 Pending: {stats.pending} | 🟢 Approved: {stats.approved} | 📣 Posted: {stats.posted}
        </p>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {confessions.map((conf) => (
          <div key={conf.id} className="border rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">
              ID: {conf.id} • Date: {conf.createdAt.toDate().toLocaleString()} • User: {conf.username || "Anonymous"}
            </p>
            {conf.type === "text" && <p className="text-base whitespace-pre-line">{conf.content as string}</p>}
            {conf.type !== "text" && (
              <div className="mt-2">
                <MediaPreviewOnDemand id={conf.id} type={conf.type} />
              </div>
            )}
            <div className="flex gap-2 mt-4">
              {conf.status === "pending" && (
                <button className="btn-blue cursor-pointer" onClick={() => handleApprove(conf.id)}>
                  ✅ Approve
                </button>
              )}
              {conf.status === "approved" && (
                <button className="btn-green cursor-pointer" onClick={() => handleMarkPosted(conf.id)}>
                  📣 Mark as Posted
                </button>
              )}
              <button className="btn-red cursor-pointer" onClick={() => handleDelete(conf.id)}>
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaPreviewOnDemand({ id, type }: { id: string; type: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUrl = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://talabasirlaribot.fly.dev/regeneratePreview?id=${id}`);
      const data = await res.json();
      if (!data.url) throw new Error("No preview URL returned");
      setUrl(data.url);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {!url && !error && (
        <button className="btn-blue cursor-pointer" onClick={fetchUrl}>
          {loading ? "Loading..." : "👁 Preview Media"}
        </button>
      )}
      {error && <p className="text-red-500">⚠️ Failed to load preview</p>}

      {url && type === "photo" && <img src={url} className="max-w-xs rounded-lg" />}
      {url && type === "video" && <video src={url} controls className="max-w-xs rounded-lg" />}
      {url && type === "voice" && <audio src={url} controls className="w-full" />}
    </div>
  );
}
