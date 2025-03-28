import { useState } from "react";
import axios from "axios";

function BankTransfer() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const bankOptions = [
    "Bank of Abyssinia",
    "Awash Bank",
    "Commercial Bank of Ethiopia",
    "Oromia Bank",
    "Abay Bank",
    "Ahadu Bank",
    "Zemen Bank",
    "Dashen Bank",
    "Hibret Bank",
    "Buna Bank",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized. Please login first.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/bank-transfer",
        { bankName, accountNumber, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Bank transfer submitted successfully.");
      setBankName("");
      setAccountNumber("");
      setAmount("");
    } catch (error) {
      console.error("❌ Error submitting transfer:", error);
      alert("❌ Failed to submit transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Bank Transfer</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Bank Name</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            >
              <option value="">-- Select Bank --</option>
              {bankOptions.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Transfer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BankTransfer;
