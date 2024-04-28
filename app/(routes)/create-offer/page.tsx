import { CreateOfferForm } from "@/app/(routes)/create-offer/components/create-offer-form";

const CreateOfferPage = () => {
  return (
    <section className="w-full h-full justify-start flex flex-col gap-y-5">
      <h1 className="text-3xl font-bold">Create Product Offer</h1>
      <p className="text-gray-500 font-light">
        Fill in the form below to create a new product offer.
      </p>
      <CreateOfferForm />
    </section>
  );
};

export default CreateOfferPage;
