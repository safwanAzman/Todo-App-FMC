import React from 'react'

type FooterProps = {
    coutItemsLeft:      number, 
    colorActive:        string, 
    clearAllFunc:       () => void,
    allTabFunc:         () => void,
    activeTabFunc:      () => void,
    completeTabFunc:    () => void,
};

const Footer: React.FC<FooterProps> = ({ 
    coutItemsLeft,
    clearAllFunc,
    allTabFunc,
    activeTabFunc,
    completeTabFunc,
    colorActive
}) => {

    const handleClearComplete = () => {
        clearAllFunc();
    }

    return (
        <div>
            {/* mobile */}
            <div className="block md:hidden">
                <div className="p-4 flex justify-between items-center ">
                <div className="text-xs text-gray-400 font-semibold">
                    <p>{coutItemsLeft} items left</p>
                </div>
                <div className="text-xs text-gray-400 font-semibold">
                    <button 
                        onClick={handleClearComplete}
                        className="hover:text-red-500"
                    >
                        Clear Complete
                    </button>
                </div>
                </div>
            </div>

            {/* desktop */}
            <div className=" py-4 flex items-center justify-around bg-white  rounded-lg shadow-lg mt-3  absolute w-full md:sticky md:mt-0  dark:bg-gray-800">
                <div className="text-xs hidden md:block font-semibold text-gray-400">
                    <p>{coutItemsLeft} items left</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400">
                    <button onClick={allTabFunc} className={`hover:text-primary ${colorActive == 'all' ? 'text-primary' : ''}`}>
                        All
                    </button>
                    <button onClick={activeTabFunc} className={`hover:text-primary ${colorActive == 'active' ? 'text-primary' : ''}`}>
                        Active
                    </button>
                    <button onClick={completeTabFunc} className={`hover:text-primary ${colorActive == 'complete' ? 'text-primary' : ''}`}>
                        Complete
                    </button>
                </div>
                <div className="text-xs font-semibold  hidden md:block text-gray-400">
                    <button 
                        onClick={handleClearComplete}
                        className="hover:text-red-500"
                    >
                        Clear Complete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Footer;
