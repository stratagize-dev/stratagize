interface Props {
  header: string;
  message: string;
}
const MessageBlock = ({ header, message }: Props) => {
  return (
    <div>
      <p className="text-3xl font-semibold text-orange-500">{header}</p>
      <p className="mt-1 text-gray-500">{message}</p>
    </div>
  );
};

export default MessageBlock;
