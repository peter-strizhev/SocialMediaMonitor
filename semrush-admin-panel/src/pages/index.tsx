import { GetServerSideProps } from 'next';

interface Feed {
  _id: string;
  platform: string;
  content: string;
  timestamp: string;
  hashtags: string[];
}

interface Props {
  feeds: Feed[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('http://localhost:3000/api/feeds');
  const data: Feed[] = await res.json();

  return { props: { feeds: data } };
};

export default function Home({ feeds }: Props) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Social Media Feeds</h1>
      <ul>
        {feeds.map((feed) => (
          <li key={feed._id} className="border p-4 my-2">
            <p>{feed.content}</p>
            <small>
              {feed.platform} - {new Date(feed.timestamp).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
