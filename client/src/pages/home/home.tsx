import Header from "@/components/home/header";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <>
      <header className="w-full h-[60px] relative z-10 bg-white">
        <Header />
      </header>
      <div className="h-[40rem] w-full rounded-md bg-white dark:bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
          <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b bg-black dark:from-neutral-200 to-neutral-600 font-sans font-bold">
            Welcome to Movie Revenue Prediction
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm">
            Welcome to Movie Revenue Predictor, the best platform for
            forecasting box office earnings. We provide reliable, scalable, and
            customizable revenue prediction solutions for your business. Whether
            you're analyzing past trends, estimating future movie earnings, or
            optimizing marketing strategies, Movie Revenue Predictor has got you
            covered.
          </p>
        </div>

        {/* Background Animation */}
        <BackgroundBeams />
      </div>
    </>
  );
}
