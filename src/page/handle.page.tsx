import LoadingPage from "../component/loading.page";
import NotFoundPage from "../component/notFound.component";
import { isInAdminRoute } from "../util";

const HandlePage = () => {

  if(isInAdminRoute()){
    return <LoadingPage></LoadingPage>
  }
  return <NotFoundPage></NotFoundPage>
}

export default HandlePage;
