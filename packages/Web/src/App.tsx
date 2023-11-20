import { useState } from "react";
import "./App.css";
import toast from "react-hot-toast";

console.log(import.meta.env.VITE_PAYMENTS_API_URL);

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const showSuccessToast = () => toast.success("Payment sent");
  const showErrorToast = () => toast.error("Payment not sent");

  const triggerPayment = async ({
    from,
    to,
    amount,
  }: {
    from: string;
    to: string;
    amount: number;
  }) => {
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_PAYMENTS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        from,
        to,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Payment initiation failed");
          showErrorToast();
        } else {
          console.log("Payment initiated");
          showSuccessToast();
        }
      })
      .catch((e) => {
        console.error("Payment initiation failed");
        showErrorToast();
        throw e;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="card">
        <input
          placeholder="From"
          value={from}
          onChange={(event) => {
            setFrom(event.target.value);
          }}
        />
        <input
          placeholder="To"
          value={to}
          onChange={(event) => {
            setTo(event.target.value);
          }}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <button
          onClick={() => {
            triggerPayment({ from, to, amount: Number(amount) });
          }}
          disabled={isLoading}
        >
          {isLoading ? "Paying..." : "Pay"}
        </button>
      </div>
    </>
  );
}

export default App;
