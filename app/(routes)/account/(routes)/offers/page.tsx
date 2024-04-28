import { auth } from "@/auth";

const UserOffersPage = async () => {
  const session = await auth();
  return <div>UserOffers</div>;
};

export default UserOffersPage;
