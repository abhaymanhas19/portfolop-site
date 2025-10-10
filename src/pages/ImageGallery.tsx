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
      <section className="relative flex min-h-[300px] items-end">
        <motion.img
          src={profile.image}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/94 via-white/90 to-[#FDF4EE]/85" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border border-amber-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-500">
                Image Gallery
              </span>
              <h1 className="text-3xl font-semibold text-slate-900 md:text-5xl">
                Moments from the journey of building products
              </h1>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-amber-200 hover:bg-amber-50/70 hover:text-amber-600"
            >
              Back to home
            </Link>
          </motion.div>
        </div>
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
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
