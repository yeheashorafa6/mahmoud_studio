"use client"

import { motion } from "framer-motion"
import useScrollProgress from "@/hooks/useScrollProgress"
function Template({children}) {
    const completion = useScrollProgress();
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }
    return (
    <>
    <motion.main
     variants={variants}
     initial="hidden" 
     animate="visible"
     transition={{type :'linear' , delay :0.2 , duration : 0.4}}>

        {children}

    </motion.main>

    {/* COMPLETION BAR */}
    <span style={{transform : `translateY(${completion - 100}%)`}} className="rounded-full fixed z-50 bg-secondary w-[3px] top-0 right-0 bottom-0 transition-all duration-500"></span>
    </>
  )
}

export default Template
