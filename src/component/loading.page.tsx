import loading from "../image/loading.svg";
const LoadingPage = () => {
  return (
    <div className="bg-gray-200 w-full h-full">
      <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-full">
        <img src={loading} className="m-auto"/>
        <h1>loading ...</h1>
      </div>
    </div>
  )
}

export default LoadingPage;
