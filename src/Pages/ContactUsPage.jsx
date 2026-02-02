import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const ContactUsPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Contact Form:', data)
    alert('Message sent successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* -------------------- Contact Form -------------------- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions or need assistance? Fill out the form and we’ll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className='space-y-2'>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Your Subject"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message..."
                rows={5}
                {...register('message', { required: 'Message is required' })}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full mt-4 py-3 text-lg font-semibold">
              Send Message
            </Button>
          </form>
        </div>

        {/* -------------------- Contact Info -------------------- */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Info</h2>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Phone</p>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600">support@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-primary mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-gray-600">123 Main Street, New York, USA</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-primary transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>

          {/* Optional Map Embed */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.892148998511!2d-74.00601528459354!3d40.71277577933021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3161f0cb5d%3A0x6e0e7ed6de2c3e1!2sNew%20York%2C%20USA!5e0!3m2!1sen!2s!4v1675284741393!5m2!1sen!2s"
              className="w-full h-64 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
