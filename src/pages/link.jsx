import Device from "@/components/device-stats";
import useFetch from "@/components/hooks/use-fetch";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {

  
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a")
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

  }

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a href={url?.original_url} target="_blank"
          className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer">
            https://shortly.in/{link}
          </a>
          <a href={url?.original_url} target="_blank">
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm"
          
          >{new Date(url?.created_at).toLocaleString()}</span>

              <div className="flex gap-2">
          <Button onClick={() =>
        navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
      }>
        <Copy/>
      </Button>
   
      <Button onClick = {downloadImage} >
        <Download/>
      </Button>
   
      <Button onClick={()=>fnDelete()}> 
        {loadingDelete? <BeatLoader size={5} /> : <Trash/>}
      </Button>

      </div>

      <img src={url?.qr} 
      className="w-full self-center sm:self-start ring grayscale-25-blue-500 p-1 object contain"
      alt="qr code" />

        </div>

        <Card className="sm:w-3/5">

  <CardHeader >
    <CardTitle className="text-4xl font-extrabold">Card Title</CardTitle>
  
  </CardHeader>
{stats && stats?.length ? (

 <CardContent className="flex flex-col gap-6">
     <Card>
   <CardHeader>
 
          <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{stats?.length}</p>
             
          </CardContent>
      </Card>
        <CardTitle>Location Data </CardTitle>
        <Location stats={stats}/>
<CardTitle>Device Info </CardTitle>
<Device stats={stats}/>
  </CardContent>


 ) : (
< CardContent>
    {loadingStats === false
    ? "No Statistics yet"
    : "Loading Statistics.."
    }
  </CardContent>
 )}
</Card>


      </div>
    </>
  );
};

export default Link;
