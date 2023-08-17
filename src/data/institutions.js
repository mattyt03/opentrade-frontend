import RobinhoodLogo from "../assets/robinhood.png";
import TDALogo from "../assets/td_ameritrade.png";
import ETradeLogo from "../assets/etrade.jpeg";
import CoinbaseLogo from "../assets/coinbase.png";
import SchwabLogo from "../assets/charles_schwab.jpeg";
import FidelityLogo from "../assets/fidelity.jpeg";
import BinanceLogo from "../assets/binance.jpeg";
import IBLogo from "../assets/interactive_brokers.png";

const institution_data = {
  robinhood: {
    name: "Robinhood",
    link: "robinhood.com",
    logo: RobinhoodLogo,
    forgot_password_link: null,
    color: "#004022",
    redirect: false,
  },
  tda: {
    name: "TD Ameritrade",
    link: "www.tdameritrade.com",
    logo: TDALogo,
    forgot_password_link: null,
    color: "#00b625",
    redirect: true,
  },
  etrade: {
    name: "E*Trade",
    link: "us.etrade.com",
    logo: ETradeLogo,
    forgot_password_link: null,
    color: "#6633cc",
    redirect: true,
  },
  coinbase: {
    name: "Coinbase",
    link: "www.coinbase.com",
    logo: CoinbaseLogo,
    forgot_password_link: null,
    color: "#0052ff",
    redirect: true,
  },
  schwab: {
    name: "Charles Schwab",
    link: "www.schwab.com",
    logo: SchwabLogo,
    forgot_password_link: null,
    color: "#00a0de",
    redirect: false,
  },
  fidelity: {
    name: "Fidelity",
    link: "www.fidelity.com",
    logo: FidelityLogo,
    forgot_password_link: null,
    color: "#128741",
    redirect: false,
  },
  binance: {
    name: "Binance",
    link: "www.binance.com",
    logo: BinanceLogo,
    forgot_password_link: null,
    color: "#212227",
    redirect: false,
  },
  ib: {
    name: "Interactive Brokers",
    link: "interactivebrokers.com",
    logo: IBLogo,
    forgot_password_link: null,
    color: "#d81222",
    redirect: false,
  },
};

export default institution_data;