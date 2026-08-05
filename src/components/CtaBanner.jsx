export default function CtaBanner() {
  return (
    <section className="px-6">
      <div
        className="reveal max-w-6xl mx-auto rounded-[28px] px-8 py-16 md:py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#3758f9,#2c3ed1)' }}
      >
        <div className="relative z-10">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Have a project in mind?<br />Let's build it.
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Whether it's a full product or a tricky feature, I'm usually free within a week or two.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-rose rounded-[14px] font-semibold text-sm transition-all duration-200 cursor-pointer hover:-translate-y-px hover:shadow-lg"
            >
              Book a Call
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3 border-[1.5px] border-white/40 text-white rounded-[14px] font-semibold text-sm transition-all duration-200 cursor-pointer hover:bg-white/10"
            >
              See My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
