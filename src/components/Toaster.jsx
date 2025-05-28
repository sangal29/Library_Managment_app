/* eslint-disable react/prop-types */
function Toaster({ message, textColorClass }) {
  return (
    <article
      className={`fixed top-4 right-6 shadow-lg bg-blue-900 max-w-[400px] rounded-md font-semibold px-3 py-3 ${textColorClass}`}>
      <p>{message}</p>
    </article>
  );
}

export default Toaster;
