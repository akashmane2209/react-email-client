import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "@/components/Avatar";
import Loader from "@/components/Email/Loader";

import { useEmailContext } from "@/contexts/EmailContext";

import EmailService from "@/services/email.service";

function EmailItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setBody, getById, toggleFavourite, toggleRead } = useEmailContext();
  const [isFetching, setIsFetching] = useState(false);

  const email = useMemo(() => {
    if (id) {
      return getById(id);
    }
  }, [id]);

  const handleEscape = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      goBack();
    }
  };

  const goBack = () => navigate("/");

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);
    return () => document.removeEventListener("keydown", handleEscape, false);
  }, []);

  useEffect(() => {
    if (id) {
      if (!email?.body) {
        setIsFetching(true);
        EmailService.fetchEmailById(id)
          .then((data) => {
            setBody(id as string, data.body);
            toggleRead(id as string, false);
          })
          .finally(() => setIsFetching(false));
      }
    }
  }, [id]);

  const handleFavourite = () => {
    toggleFavourite(id as string, email?.favourite as boolean);
  };

  return (
    <div className="relative w-full py-3">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {email && email.body ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex space-x-5">
                  <Avatar name={email.from.name} />
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">
                      {email.subject}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {email.formattedDate}
                    </p>
                  </div>
                </div>
                <button
                  className="px-2 py-1 text-xs text-white rounded-full bg-accent"
                  onClick={handleFavourite}
                >
                  {email?.favourite
                    ? "Remove from favourite"
                    : "Mark as favourite"}
                </button>
              </div>
              <div
                className="px-5 mt-5 font-sans text-sm"
                dangerouslySetInnerHTML={{ __html: email.body }}
              />
            </>
          ) : null}
        </>
      )}

      <span className="absolute top-0 right-0 text-lg">
        <button onClick={goBack}>X</button>
      </span>
    </div>
  );
}

export default EmailItem;
