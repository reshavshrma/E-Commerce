import { 
    FaRegFileAlt, 
    FaUserShield, 
    FaShoppingCart, 
    FaTruck, 
    FaCreditCard, 
    FaUndo, 
    FaUserCheck 
  } from "react-icons/fa";
  
  const TermCard = ({ Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <Icon className="text-indigo-600 w-6 h-6 mt-1" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
  
    const Policies = () => {
    const terms = [
      {
        Icon: FaRegFileAlt,
        title: "Acceptance of Terms",
        description: "By accessing or using Shopzo, you confirm your agreement to be bound by our terms and policies."
      },
      {
        Icon: FaShoppingCart,
        title: "Product Listings",
        description: "All vendors are responsible for their listed product accuracy. Any false representation may lead to penalties."
      },
      {
        Icon: FaUserShield,
        title: "User Privacy & Security",
        description: "Your data is protected with strict security protocols. Shopzo never sells or shares user data without consent."
      },
      {
        Icon: FaCreditCard,
        title: "Secure Payments",
        description: "Transactions are processed securely. We use third-party payment gateways and do not store payment info."
      },
      {
        Icon: FaTruck,
        title: "Shipping & Delivery",
        description: "Delivery timelines are estimated per vendor. Shopzo ensures vendors follow reliable and prompt delivery methods."
      },
      {
        Icon: FaUndo,
        title: "Returns & Refunds",
        description: "Each vendor has its own return/refund policy. Please verify return conditions on the product page before purchasing."
      },
      {
        Icon: FaUserCheck,
        title: "Account Responsibility",
        description: "Users must provide authentic details and are responsible for any activity under their registered account."
      },
    ];
  
    return (
      <section className="min-h-screen px-4 md:px-20 py-16 bg-gray-50 text-gray-800 font-sans">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-700">
            Terms & Conditions
          </h1>
          <p className="text-center text-gray-600 text-base md:text-lg mb-12">
            Please read our terms carefully before engaging with our platform. Using Shopzo implies your agreement with the following.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {terms.map((term, idx) => (
              <TermCard key={idx} {...term} />
            ))}
          </div>
  
          <div className="mt-16 text-sm text-gray-500 text-center">
            Last Updated: April 2025
          </div>
        </div>
      </section>
    );
  }
  export default Policies