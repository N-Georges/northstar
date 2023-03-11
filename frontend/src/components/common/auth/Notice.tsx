import Link from "next/link";

const Notice = ({
  content,
  actionLink,
  actionMessage,
  icon,
}: {
  content: string;
  actionLink: string;
  actionMessage: string;
  icon: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-2 rounded-md bg-gray-50 p-4 text-xs leading-4 text-gray-700">
      {icon}
      <div className="flex items-center space-x-1">
        <span className="">{content}</span>
        <Link href={actionLink}>
          <p className="text-blue-600 underline">{actionMessage}</p>
        </Link>
      </div>
    </div>
  );
};

export default Notice;
