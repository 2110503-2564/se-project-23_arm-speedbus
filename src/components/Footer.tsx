export default function Footer() {
    return (
      <footer className="w-full bg-gray-100 text-black font-mono px-10 py-[4vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">ARM SPEED BUS</h2>
            <p className="text-gray-700 leading-relaxed">
              ARM SPEED BUS is a modern car rental service offering flexible and reliable options for every journey. Whether you're planning a weekend trip or need a ride for your daily commute — we've got you covered.
            </p>
            <div>
              <p className="font-semibold underline">Social</p>
              <p>Instagram</p>
            </div>
          </div>
  
          {/* Middle Column */}
          <div className="space-y-2">
            <p className="font-semibold underline">Information</p>
            <p>Rental Guide</p>
            <p>FAQ</p>
            <p>Partner With Us</p>
            <p>Contact</p>
            <p>Terms & Conditions</p>
          </div>
  
          {/* Right Column */}
          <div className="space-y-4">
            <p className="font-semibold">Subscribe to our newsletter for the latest rental deals and updates.</p>
            
            <div className="flex border-b border-black pb-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent focus:outline-none flex-1 placeholder-gray-500"
              />
              <button className="text-gray-700">Subscribe</button>
            </div>
  
            <label className="flex items-center space-x-2 text-xs text-gray-600">
              <input type="checkbox" className="form-checkbox" />
              <span>
                I have read and accept the <span className="underline">terms and conditions</span>.
              </span>
            </label>
          </div>
        </div>
      </footer>
    );
  }
  