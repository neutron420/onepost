import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => {
    const offset = i * 5 * position;
    const heightStep = i * 6;

    // Adjusted coordinates to be more visible within viewBox
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
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg
        className="w-full h-full text-slate-800"
        viewBox="0 0 800 600"
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
            animate={{
              pathLength: 1,
              opacity: path.opacity,
            }}
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
  const words = title.split(" ");
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate("/sign-up");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Background */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-0.5} />

      {/* Foreground Content */}
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
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
                    className="inline-block text-transparent bg-clip-text 
                      bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Call-to-Action Button with Sign Up navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="inline-block group relative bg-gradient-to-b from-black/10 to-black/5 
                p-px rounded-2xl backdrop-blur-lg 
                overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              onClick={handleDiscoverClick}
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-white/95 hover:bg-white text-black transition-all duration-300 
                group-hover:-translate-y-0.5 border border-black/10
                hover:shadow-md"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Discover Excellence
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
  );
}