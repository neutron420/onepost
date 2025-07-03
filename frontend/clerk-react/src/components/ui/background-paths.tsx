import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => {
    const offset = i * 5 * position;
    const heightStep = i * 8;

    const d = `M${50 + offset} ${50 + heightStep}
               C${50 + offset} ${50 + heightStep}
               ${120 + offset} ${200 + heightStep}
               ${350 + offset} ${300 + heightStep}
               C${580 + offset} ${400 + heightStep}
               ${650 + offset} ${550 + heightStep}
               ${650 + offset} ${550 + heightStep}`;

    return {
      id: i,
      d,
      width: 0.5 + i * 0.03,
      opacity: 0.03 + i * 0.02,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-800"
        viewBox="0 0 800 1200"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: path.opacity }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({ title = "One Post" }: { title?: string }) {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const words = title.split(" ");

  const handleDiscoverClick = () => {
    if (isSignedIn) {
      navigate("/write-blog");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <FloatingPaths position={1} />
        <FloatingPaths position={-0.5} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Top-left Logo */}
        <div className="absolute top-0 left-0 z-20 p-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <motion.img
              src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
              alt="One Post Logo"
              className="h-8 w-8"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            />
            <motion.h2
              className="text-xl font-semibold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              One Post
            </motion.h2>
          </motion.div>
        </div>

        {/* Main Center Title with Icon */}
        <div className="relative z-10 container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center items-center mb-6">
              <motion.img
                src="https://www.shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg"
                alt="Icon"
                className="h-10 w-10 mr-4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              />
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.2 + letterIndex * 0.05,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="inline-block group relative bg-gradient-to-b from-black/10 to-black/5 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Button
                onClick={handleDiscoverClick}
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-white/95 hover:bg-white text-black transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 hover:shadow-md"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                  Draft Your Blogs
                </span>
                <motion.span
                  className="ml-3 opacity-70 group-hover:opacity-100 transition-all duration-300 inline-block"
                  whileHover={{ x: 6 }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function BackgroundPathsOverlay() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full text-slate-800"
          viewBox="0 0 800 1200"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 36 }, (_, i) => {
            const offset = i * 5;
            const heightStep = i * 8;
            const d = `M${50 + offset} ${50 + heightStep}
                       C${50 + offset} ${50 + heightStep}
                       ${120 + offset} ${200 + heightStep}
                       ${350 + offset} ${300 + heightStep}
                       C${580 + offset} ${400 + heightStep}
                       ${650 + offset} ${550 + heightStep}
                       ${650 + offset} ${550 + heightStep}`;
            return (
              <motion.path
                key={i}
                d={d}
                stroke="currentColor"
                strokeWidth={0.5 + i * 0.03}
                strokeOpacity={0.03 + i * 0.02}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.03 + i * 0.02,
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
