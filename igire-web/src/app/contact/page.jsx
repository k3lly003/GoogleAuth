'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { FaMapMarkerAlt, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";

export default function PartnershipInquiryForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 tablet:px-10 laptop:px-20 desktop:px-[7.7rem] mb-[25rem]"
            style={{ backgroundImage: 'url(/bgContact.png)', backgroundSize: 'cover', height: '35.4rem' }}>
            <div className='font-bold text-white w-full mt-[8.4rem] text-center tablet:text-left'>
                <h2 className="text-xl text-center">For partnership inquiries</h2>
                <div className="w-full p-8 flex flex-col justify-center laptop:flex-row tablet:flex-col">
                    <div className="w-full desktop:w-[45.3rem] text-left h-[42.6rem] laptop:w-[45.3rem] bg-white dark:bg-gray-800 drop-shadow-md desktop:px-[4.4rem] tablet:px-[2rem] px-[1rem]">
                        <p className="flex items-start justify-between pt-[4.8rem] text-md text-black dark:text-white">Please contact us or drop us a message <span className='text-[#F79E1B] w-[2.3rem]'><RiMailSendLine/></span></p>
                        <form onSubmit={handleSubmit} className="space-y-[1.9rem] mt-4 tablet:mt-[4.3rem]">
                            <div>
                                <label htmlFor="name" className=" text-black dark:text-white">Name</label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="name"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className=" text-black dark:text-white">Email</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className=" text-black dark:text-white">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="message"
                                    rows={8}
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="tablet:w-[7rem] w-full text-black dark:text-white text-md h-[3rem] mt-[1.9rem] bg-green-500 hover:bg-[#0FA958]">
                                Send
                            </Button>
                        </form>
                    </div>

                    <div className="flex flex-col items-center pt-[2.5rem] bg-green-500 text-white w-full laptop:w-[26.6rem] rounded-sm h-[42.6rem] mt-8 laptop:mt-0">
                        <h3 className="font-bold text-center text-lg">Contact <br /> Information</h3>
                        <div className="space-y-2 flex flex-col text-left gap-6 tablet:gap-[3.9rem] mt-[4rem] px-4">
                            <p className="flex items-center text-black"><FaMapMarkerAlt className="mr-[1rem] text-white font-light" size={28} /> KG 549 <br />Street Impact Center, Kacyiru</p>
                            <p className="flex items-center text-black"><FaEnvelope className="mr-[1rem] text-white" size={28} />igirerwanda@gmail.com</p>
                            <p className="flex items-center text-black"><FaPhoneAlt className="mr-[1rem] text-white" size={28} /> +250 788 473 533</p>
                        </div>
                        <div className="mt-[9rem] flex flex-col gap-[1rem] items-center">
                            <h4 className="font-semibold text-[#F79E1B]">Our Social Media</h4>
                            <div className="flex space-x-6 pb-[4.4rem]">
                                <a href=''><CiLinkedin size={30} className=' text-white hover:text-[#F79E1B]'/></a>
                                <a href=''><RiTwitterXFill size={25} className='border-sm  text-white hover:text-[#F79E1B]' /></a>
                                <a href='https://www.instagram.com/igire_rwanda/'><FaInstagram size={25} className=' text-white hover:text-[#F79E1B]'/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
