interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const [firstName, lastName] = name.split(" ");
  const initials =
    firstName?.toUpperCase()[0] + (lastName ? lastName.toUpperCase()[0] : "");
  return (
    <span className="inline-flex items-center justify-center w-12 h-12 text-white align-middle rounded-full select-none bg-accent">
      <span className="flex items-center justify-center w-full h-full text-sm">
        {initials}
      </span>
    </span>
  );
};

export default Avatar;
