import React, { useState } from 'react';

const Communication = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]); 

    const addNote = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            setNotes([...notes, { id: Date.now(), title, content }]);
            setTitle('');
            setContent('');
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Communication</h1>
            <form onSubmit={addNote} style={{ marginBottom: '20px' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Write your note here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height: '100px', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: '8px 16px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add Note
                </button>
            </form>

            <div>
                <h2>Notes</h2>
                {notes.length === 0 ? (
                    <p>No notes yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {notes.map(note => (
                            <li
                                key={note.id}
                                style={{
                                    backgroundColor: '#f9f9f9',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <h3 style={{ color:'black', margin: 0 }}>{note.title}</h3>
                                    <p style={{ color:'black', margin: '5px 0' }}>{note.content}</p>
                                </div>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#ff4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Communication;