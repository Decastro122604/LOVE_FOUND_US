import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({
  isLoading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-warm-cream"
        >
          <div className="text-center px-6">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="text-6xl mb-6"
            >
              <Heart className="mx-auto h-16 w-16 text-love-red" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif text-love-red mb-4">
              Love Found Us
            </h1>

            <p className="text-lg md:text-xl text-soft-clay leading-relaxed">
              A story written by God,
              <br />
              lived by Bry & Lyka.
            </p>

            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="mt-8 text-sm tracking-widest uppercase text-soft-clay"
            >
              Loading Our Story...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}