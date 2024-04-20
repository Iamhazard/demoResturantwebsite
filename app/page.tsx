import SectionHeaders from "@/components/NavBar/Home/Header";
import Homepage from "@/components/NavBar/Home/Home";
import HomeMenu from "@/components/NavBar/Home/HomeMenu";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Homepage />

      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader="Our story"
          mainHeader="About Us"
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Food is just a click away!
          </p>
          <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
          <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
        </div>

      </section>

      <section className="text-center my-8">
        <SectionHeaders

          mainHeader="Contact us"
          subHeader="Our Mission"
        />
        <div className="mt-8">
          <Link className="text-4xl underline text-gray-500" href="tel:056 056145">
            056 056145
          </Link>
        </div>
      </section>




    </>
  );
}
