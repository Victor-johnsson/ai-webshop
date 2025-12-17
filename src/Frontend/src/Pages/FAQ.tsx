import React from "react";

function FAQ() {
  return (
    <div className="container mx-auto my-8 p-6 max-w-2xl rounded shadow">
      <h1 className="text-3xl font-bold mb-6">
        Frequently Asked Questions (FAQ)
      </h1>

      {/* Orders & Purchasing */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Orders & Purchasing</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How do I place an order?</h3>
        <p className="pl-2">
          Browse our products, add desired items to your cart, and proceed to
          checkout to place your order. You’ll receive a confirmation email once
          your order has been submitted.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          How do I know my order was placed successfully?
        </h3>
        <p className="pl-2">
          After placing your order, you will receive a confirmation email with
          your order number and details. If you don’t receive this email within
          a few minutes, please check your spam folder or contact customer
          support.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Can I cancel my order after placing it?
        </h3>
        <p className="pl-2">
          If you need to cancel your order, please contact us as soon as
          possible. Once your order is processed or shipped, cancellation may
          not be possible, but we’ll do our best to help.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          I made a mistake in my shipping address—can I change it?
        </h3>
        <p className="pl-2">
          Please reach out to our support team right away with your order number
          and correct address. If your order hasn’t shipped yet, we can update
          the address for you.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Can I modify my order after placing it?
        </h3>
        <p className="pl-2">
          Please contact our support as soon as possible if you need to modify
          your order. We’ll do our best to accommodate changes, but orders that
          have already shipped cannot be modified.
        </p>
      </div>

      {/* Payments & Pricing */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Payments & Pricing</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          What payment methods do you accept?
        </h3>
        <p className="pl-2">
          We accept all major credit cards and PayPal. Occasionally, promotional
          payment methods or Buy Now, Pay Later options may be available at
          checkout.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Are my payment details secure?
        </h3>
        <p className="pl-2">
          Absolutely. We use secure, encrypted payment gateways, and your card
          details are never stored on our servers. We follow industry best
          practices for payment security.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">When is my card charged?</h3>
        <p className="pl-2">
          Your card is charged at the time your order is placed. If there are
          any payment issues, you’ll be notified immediately.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Do you offer discounts or promo codes?
        </h3>
        <p className="pl-2">
          We offer discounts and promo codes throughout the year! Check our
          homepage or subscribe to our newsletter to stay updated on the latest
          offers.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Is tax included in the price?</h3>
        <p className="pl-2">
          All applicable taxes are displayed during checkout based on your
          shipping address.
        </p>
      </div>

      {/* Shipping & Delivery */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Shipping & Delivery</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Do you offer international shipping?
        </h3>
        <p className="pl-2">
          Yes, we ship to many countries worldwide. Shipping rates and delivery
          times vary depending on your location. You’ll see the options
          available to you at checkout.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How much does shipping cost?</h3>
        <p className="pl-2">
          Shipping costs are calculated based on your order total and delivery
          address. You can review exact charges during checkout before
          finalizing your purchase.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How long will delivery take?</h3>
        <p className="pl-2">
          Delivery times depend on the shipping method chosen and your location.
          Most orders arrive within 3–7 business days. You’ll receive estimated
          delivery information at checkout and in your order confirmation email.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How can I track my shipment?</h3>
        <p className="pl-2">
          Once your order ships, you’ll receive an email with tracking
          information. You can use this to monitor your package’s status en
          route to your address.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          My order hasn’t arrived—what should I do?
        </h3>
        <p className="pl-2">
          If your order hasn’t arrived by the estimated delivery date, please
          check your tracking link for any updates or delays. If you need
          assistance, contact our support team and we’ll investigate right away.
        </p>
      </div>

      {/* Returns & Refunds */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Returns & Refunds</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">What is your return policy?</h3>
        <p className="pl-2">
          You can return most items within 30 days of delivery for a full refund
          or exchange (excluding final sale or custom-made products). Please see
          our Return Policy page for more details and instructions.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How do I start a return?</h3>
        <p className="pl-2">
          To initiate a return, please contact our customer service team with
          your order number and the reason for return. We’ll provide you with a
          return authorization and instructions.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">When will I get my refund?</h3>
        <p className="pl-2">
          Refunds are issued to your original payment method once your return is
          received and inspected. This typically takes 3–7 business days after
          we receive the item.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          What items are non-refundable?
        </h3>
        <p className="pl-2">
          Final sale, personalized, or custom made items are not eligible for
          return unless defective or damaged upon arrival. Full details are
          available on our Return Policy page.
        </p>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Products</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Are your products covered by a warranty?
        </h3>
        <p className="pl-2">
          Many of our products come with a manufacturer warranty. Specific
          warranty terms are listed on the product page or can be requested from
          our support team.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Are product colors accurate?</h3>
        <p className="pl-2">
          We strive to display product colors and images as accurately as
          possible, but actual colors may vary due to different device screens
          or lighting. If you have questions about specific items, please ask
          our team for advice.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Are items in stock?</h3>
        <p className="pl-2">
          Stock availability is displayed on each product page. If an item is
          out of stock, you may subscribe for back-in-stock notifications if
          available.
        </p>
      </div>

      {/* Account & Security */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Account & Security</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Do I need an account to order?
        </h3>
        <p className="pl-2">
          No, you may check out as a guest. However, creating an account allows
          you to track orders, view order history, and expedite future
          purchases.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How do I reset my password?</h3>
        <p className="pl-2">
          From the login page, click the “Forgot password?” link and follow the
          instructions. You’ll receive an email to reset your password securely.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          How is my personal information protected?
        </h3>
        <p className="pl-2">
          We treat your privacy very seriously. Your data is encrypted and we
          never sell your information to third parties. See our Privacy Policy
          for complete details.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">How do you use my data?</h3>
        <p className="pl-2">
          We collect and use your information only to process orders, provide
          customer service, and, if you opt in, to send marketing updates. You
          can manage your preferences or request data deletion at any time.
        </p>
      </div>

      {/* Troubleshooting & Technical */}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Troubleshooting & Technical
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          I’m having problems with the website—what can I do?
        </h3>
        <p className="pl-2">
          Try refreshing the page or accessing our site from a different device
          or browser. If the issue persists, please let us know via our support
          contact form, and we’ll help resolve it as quickly as possible.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          I didn’t get an order confirmation email.
        </h3>
        <p className="pl-2">
          First, check your spam or junk folder. If it’s not there, confirm that
          you entered your email address correctly at checkout. If still no
          luck, contact support and we’ll verify your order.
        </p>
      </div>

      {/* Customer Support */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Customer Support</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          How can I contact customer service?
        </h3>
        <p className="pl-2">
          You can reach our customer service team by email or through the
          contact form on our Contact page. We’re here to help!
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">What are your support hours?</h3>
        <p className="pl-2">
          Our support team is available Monday through Friday, 9am–5pm (local
          time). We strive to reply to all inquiries within 24 hours.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Where can I find my order history?
        </h3>
        <p className="pl-2">
          If you have an account, your order history is available in your
          account dashboard after logging in. Guest checkouts can request order
          details via customer support.
        </p>
      </div>
    </div>
  );
}

export default FAQ;
