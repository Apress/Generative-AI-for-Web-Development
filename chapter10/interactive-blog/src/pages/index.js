import { useState } from 'react';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../lib/posts';

export async function getStaticProps() {
    const allPosts = getAllPostIds().map(({ params }) => {
        const postData = getPostData(params.id);
        return postData;
    });

    return {
        props: {
            allPosts
        }
    };
}

export default function Home({ allPosts }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="container">
            <h1 className="title">My Blog</h1>
            <ul className="post-list">
                {allPosts.map(({ id, title }) => (
                    <li key={id} className="post-item">
                        <Link href={`/posts/${id}`} className="post-link">
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
            <button className="chat-button" onClick={toggleChat}>
                {isChatOpen ? 'Close Chat' : 'Open Chat'}
            </button>
            <div className={`chat-frame ${isChatOpen ? 'open' : ''}`}>
                <iframe src="/chat" frameBorder="0"></iframe>
            </div>
            <style jsx>{`
                .container {
                    font-family: 'Roboto', sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .title {
                    font-size: 2.5rem;
                    color: #333;
                    text-align: center;
                    margin-bottom: 40px;
                }
                .post-list {
                    list-style: none;
                    padding: 0;
                }
                .post-item {
                    margin: 20px 0;
                }
                .post-link {
                    text-decoration: none;
                    color: #0070f3;
                    font-size: 1.5rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                .post-link:hover {
                    color: #0056b3;
                }
                .chat-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    font-size: 1rem;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s, transform 0.3s;
                }
                .chat-button:hover {
                    background-color: #0056b3;
                    transform: scale(1.1);
                }
                .chat-frame {
                    position: fixed;
                    bottom: 80px;
                    right: 20px;
                    width: 350px;
                    height: 500px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    transform: translateY(100%);
                    transition: transform 0.3s ease-in-out;
                    opacity: 0;
                    visibility: hidden;
                }
                .chat-frame.open {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}
