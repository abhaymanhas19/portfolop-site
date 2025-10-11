import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { galleryContent } from '../data/content'
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
  const [selectedImage, setSelectedImage] = useState<(typeof galleryContent.images)[number] | null>(null)
  const { images, profile } = galleryContent

  return (
    <div className="bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.img
            src={profile.image}
            alt="Gallery hero"
            className="block h-[min(55vh,480px)] w-full object-cover md:h-[480px]"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 text-white md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-white/60 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                  Image Gallery
                </span>
                <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                  Moments from the journey of building products
                </h1>
                <p className="max-w-3xl text-sm text-white/85 md:text-base">
                  Rituals, workspaces, and the people who keep delivery grounded—captured between releases and retros.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-white hover:bg-white"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8">
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          A masonry collection of workspaces, teams, and small rituals that keep delivery grounded. Each photo is a checkpoint along the shipping journey.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mt-10 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
        >
          {images.map((image, index) => (
            <motion.figure
              key={image.id}
              variants={itemVariants}
              className="group relative break-inside-avoid overflow-hidden rounded-[28px] border border-amber-100 bg-white/90 shadow-[0_24px_60px_rgba(120,72,0,0.12)]"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.01 }}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImage(image)}
              onKeyDown={event => {
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
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 px-4 pb-4 text-left text-white opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {image.location ?? 'Captured moment'}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {image.title ?? image.alt}
                  </span>
                  {image.description ? (
                    <span className="text-xs text-white/80">{image.description}</span>
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
              className="max-h-[60vh] w-full rounded-[28px] object-cover"
              style={{ aspectRatio: `${selectedImage.width} / ${selectedImage.height}` }}
            />
            {selectedImage.description ? (
              <p className="text-sm leading-relaxed text-slate-600">{selectedImage.description}</p>
            ) : null}
            {selectedImage.capturedAt ? (
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Captured {selectedImage.capturedAt}
              </p>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
