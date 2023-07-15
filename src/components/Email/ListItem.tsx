import { Email } from "@/contexts/EmailContext";
import { NavLink, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import { cn } from "@/utils/helpers";

const EmailListItem = ({ email }: { email: Email }) => {
  const { id } = useParams();
  let commonClasses =
    "flex items-start px-6 py-2 space-x-5 text-sm transition-colors  border-b last:border-none border-border hover:bg-readbackground first:rounded-t-md last:rounded-b-md";
  if (email.read) {
    commonClasses += " bg-readbackground";
  } else {
    commonClasses += " bg-white";
  }
  return (
    <NavLink
      to={`/${email.id}`}
      className={({ isActive }) =>
        isActive
          ? cn(commonClasses, "bg-accent text-white hover:bg-accent")
          : `${commonClasses}`
      }
    >
      <div className="min-w-[45px]">
        <Avatar name={email.from.name} />
      </div>
      <div>
        <p>
          From:{" "}
          <span className="font-medium">{`${email.from.name} <${email.from.email}>`}</span>
        </p>
        <p>
          Subject: <span className="font-medium">{email.subject}</span>
        </p>
        <p
          className={cn(
            "my-2 md:overflow-hidden md:text-ellipsis md:whitespace-nowrap ",
            { "w-full md:w-[240px]": id }
          )}
        >
          {email.short_description}
        </p>
        <p className="flex justify-between">
          {email.formattedDate}
          {email.favourite ? (
            <span className="text-xs font-semibold text-accent">Favourite</span>
          ) : null}
        </p>
      </div>
    </NavLink>
  );
};

export default EmailListItem;
