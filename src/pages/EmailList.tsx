import EmailListItem from "@/components/Email/ListItem";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useEmailContext } from "@/contexts/EmailContext";
import { Filter } from "@/types";
import { FILTERS } from "@/utils/constants";
import { cn } from "@/utils/helpers";
import { Outlet, useParams } from "react-router-dom";

function EmailList() {
  const {
    data,
    allData,
    hasNext,
    isFetchingList,
    fetchMore,
    filter: selectedFilter,
    handleFilter,
  } = useEmailContext();

  const params = useParams();

  const handlePageEnd = () => {
    if (hasNext && !isFetchingList) {
      fetchMore();
    }
  };

  return (
    <div className="p-10 ">
      <div className="flex my-5 text-sm">
        <p className="mr-8">Filter By</p>
        <div className="space-x-4 filters">
          {FILTERS.map((filter) => (
            <button
              className={cn(
                "px-2 py-1 rounded-full hover:bg-gray-300 border border-transparent",
                {
                  "bg-gray-300 border-border": filter.key === selectedFilter,
                }
              )}
              key={filter.key}
              onClick={() => handleFilter(filter.key as Filter)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className={cn("flex h-[calc(100vh-11rem-60px)]", {
          "space-x-5": params.id,
        })}
      >
        <div
          className={cn("overflow-y-auto  email-list w-full", {
            "w-0 md:w-[400px]": params.id,
          })}
        >
          <InfiniteScroll<string>
            items={Object.keys(data)}
            className="border rounded-md border-border"
            rowRenderer={(id) => <EmailListItem key={id} email={data[id]} />}
            onPageEnd={handlePageEnd}
          />
          {Object.keys(data).length === 0 ? <p>No emails found</p> : null}
          {isFetchingList ? (
            <span className="flex justify-center text-center text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
          ) : null}
        </div>
        {params.id && Object.keys(allData).length ? (
          <div className="w-full md:w-[calc(100%-400px)] px-6 py-3 ml-8 bg-white border rounded-md border-border overflow-y-auto ">
            <Outlet />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default EmailList;
