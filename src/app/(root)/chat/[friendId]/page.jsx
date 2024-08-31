import Chat from "./MessagesChat";

const ChattingPage = async ({ params }) => {
  const { friendId } = params;

  return <Chat friendId={friendId} />;
};

export default ChattingPage;
