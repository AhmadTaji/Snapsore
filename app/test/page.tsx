'use client';

import { useState, useEffect } from 'react';

type Item = { _id: string; name: string; description?: string };

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', description: '' });
    const res = await fetch('/api/items');
    setItems(await res.json());
  };

  return (
    <main style={{ padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Item name" />
        <input name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} — {item.description}</li>
        ))}
      </ul>
    </main>
  );
}
