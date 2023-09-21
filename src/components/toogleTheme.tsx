import React,{useState, useEffect} from 'react';
import IconSun from '@/assets/icon-sun.svg'
import IconMoon from '@/assets/icon-moon.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'

const ToogleTheme = () => {
    const {systemTheme , theme, setTheme} = useTheme ();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() =>{
        setMounted(true);
    },[])
    
    const currentTheme = theme === "system" ? systemTheme : theme ;
    if(!mounted) return null;
    return (
        <div>
            {currentTheme === "dark" ? 
                <button onClick={() => setTheme('light')}>
                    <Image
                    src={IconSun}
                    alt='iconSun'
                    className="-mt-1"
                    />
                </button>
            :
                <button onClick={() => setTheme('dark')}>
                    <Image
                    src={IconMoon}
                    alt='iconMoon'
                    className="-mt-1"
                    />
                </button>
            }
        </div>
    )
}

export default ToogleTheme;
