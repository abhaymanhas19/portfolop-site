import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { galleryImages, type GalleryImage } from '../data/gallery'
import Modal from '../components/Modal'

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <div className="relative isolate overflow-hidden bg-background text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-10 left-[-15%] h-72 w-72 rounded-full bg-[#ff5a1c2b] blur-[110px]" aria-hidden />
        <div className="absolute bottom-[-25%] right-[-5%] h-96 w-96 rounded-full bg-[#ff5a1c1f] blur-[160px]" aria-hidden />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Image Gallery
            </span>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Moments from the journey of building products.
            </h1>
            <p className="text-base text-white/70 md:text-lg">
              A masonry collection of workspaces, teams, and small rituals that keep delivery grounded. Each photo is a checkpoint along the shipping journey.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-14 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
        >
          {galleryImages.map((image, index) => (
            <motion.figure
              key={image.id}
              variants={itemVariants}
              className="group relative break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.01 }}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImage(image)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedImage(image)
                }
              }}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 pb-4 text-left text-white/90 opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">{image.location ?? 'Captured moment'}</span>
                  <span className="text-sm font-semibold text-white">
                    {image.title ?? image.alt}
                  </span>
                  {image.description ? (
                    <span className="text-xs text-white/70">{image.description}</span>
                  ) : null}
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </section>

      <Modal
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        title={selectedImage?.title ?? selectedImage?.alt}
        subtitle={selectedImage ? selectedImage.location : undefined}
      >
        {selectedImage ? (
          <div className="space-y-4">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[60vh] w-full rounded-3xl object-cover"
              style={{ aspectRatio: `${selectedImage.width} / ${selectedImage.height}` }}
            />
            {selectedImage.description ? (
              <p className="text-sm leading-relaxed text-white/75">
                {selectedImage.description}
              </p>
            ) : null}
            {selectedImage.capturedAt ? (
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Captured {selectedImage.capturedAt}
              </p>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
