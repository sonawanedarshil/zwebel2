"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Send, Calendar, MessageSquare } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

export default function ContactForm() {

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  })

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {

        toast.success("Message sent successfully!")

        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: ""
        })

      } else {

        toast.error("Something went wrong")

      }

    } catch (error) {

      toast.error("Server error")

    }

    setLoading(false)

  }

  return (
    <>
      <Toaster />

      <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT INFO */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's Start a <span className="gradient-text">Conversation</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Whether you have a project in mind or want to learn more about our services,
                we're here to help.
              </p>

              <div className="space-y-6 mb-8">

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">contact@zwiebelai.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-gray-600">Global Offices Worldwide</p>
                  </div>
                </div>

              </div>

              <div className="space-y-4">

                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 gradient-button text-white px-6 py-3 rounded-lg font-semibold"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Google Meet</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Start Live Chat</span>
                </a>

              </div>

            </motion.div>

            {/* CONTACT FORM */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >

              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                />

                <div className="grid md:grid-cols-2 gap-4">

                  <input
                    type="text"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                  />

                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                />

                <textarea
                  rows={6}
                  placeholder="Message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border text-black placeholder-gray-400"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-button text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <Send className="w-5 h-5" />
                </button>

              </form>

            </motion.div>

          </div>

        </div>
      </section>
    </>
  )
}