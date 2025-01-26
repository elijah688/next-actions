"use server";
interface HomePageProps {
  message: string;
}

const HomePage: React.FC<HomePageProps> = async () => {
  const { message } = await getMsg();
  return (
    <div>
      <h1>Server-side Message</h1>
      <p>{message}</p>
    </div>
  );
};

const getMsg = async (): Promise<HomePageProps> => {
  const url = process.env.MSG_URL;
  if (!url) {
    throw Error("msg URL not set");
  }
  const res = await fetch(url);
  return await res.json();
};

export default HomePage;
