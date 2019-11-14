const algos = {
  singleTradeMaxProfit: function(arr) {    
    if (!Array.isArray(arr) || arr.length < 1) {
      return;
    }

    let minPrice = arr[0];
    let maxProfit = arr[1] - arr[0];

    for (let i = 0; i < arr.length; i += 1) {
      let currentPrice = arr[i];
      let potentialProfit = currentPrice - minPrice;
      maxProfit = Math.max(maxProfit, potentialProfit)
      minPrice = Math.min(minPrice, currentPrice)
    }
    if (maxProfit < 0) {
      return;
    }
    
    this.setState({
      singleTradeMaxProfitResult: maxProfit,
    });
  },



  singleTradeMinProfit: function(arr) {
    const newArr = [];

    for (let i = 0; i < arr.length; i += 1) {
      let buyHi = arr[i];
      let sellLo = Infinity;

      for (let j = i + 1; j < arr.length; j += 1) {
        if (buyHi > arr[j] && sellLo > arr[j]) {
          sellLo = arr[j];
        }
      }
      
      if (buyHi > sellLo) {
        newArr.push(sellLo - buyHi)
      }
    }

    this.setState({
      singleTradeMinProfitResult: Math.min(...newArr),
    });
  },



  multiTradeMaxProfit: function(arr) {
    let result = 0;

    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i + 1] > arr[i]) {
        result += arr[i + 1] - arr[i]
      }
    }  
    this.setState({
      multiTradeMaxProfitResult: result,
    });
  },



  multiTradeMinProfit: function(arr) {
    let result = 0;

    for (let i = 0; i < arr.length - 1; i += 1) {
      if (arr[i + 1] < arr[i]) {
        result += arr[i + 1] - arr[i]
      }
    }  
    this.setState({
      multiTradeMinProfitResult: result,
    });
  },



  SMA: function(arr, period) {
    let sum = 0

    for (let i = arr.length - period; i < arr.length; i += 1) {
      sum += arr[i];
    }

    if (period === 20) {
      this.setState({
        twentyDayMovingAvgResult: sum / period,
      })
    } else if (period === 50) {
      this.setState({
        fiftyDayMovingAvgResult: sum / period,
      })
    }
  },
}

export default algos;
