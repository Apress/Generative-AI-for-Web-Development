import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export default function Post({ postData }) {
    return (
        <div className="container">
            <h1 className="title">{postData.title}</h1>
            <p className="content">{postData.content}</p>
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
                    margin-bottom: 20px;
                    text-align: center;
                }
                .content {
                    font-size: 1.25rem;
                    line-height: 1.8;
                    color: #555;
                }
            `}</style>
        </div>
    );
}
