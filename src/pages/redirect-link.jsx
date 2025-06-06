import useFetch from "@/components/hooks/use-fetch";
import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    if (id) fn();
  }, [id]);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
      // Redirect to the original URL
      if (data.original_url) {
        window.location.replace(data.original_url);
      }
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }



  // Handle error or not found
  if (!data || !data.original_url) {
    return <div>Link not found or invalid.</div>;
  }

  return null;
};

export default RedirectLink;