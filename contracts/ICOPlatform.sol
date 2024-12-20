// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function symbol() external view returns (string memory);
    function totalSupply() external view returns (uint256);
    function name() external view returns (string memory);
    function decimals() external view returns (uint8);
}

contract ICOPlatform {
    address public manager;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens = 0;
    struct TokenDetails  {
       string name;
       string symbol;
       uint256 accountbalance;
       uint256 supply;
       uint256 tokenprice;
       address tokenaddress;
       uint256 soldtokens;
       uint256 tokenbalance;
    }
  

    constructor() {
        manager = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == manager, "Unauthorized! You're not the manager!");
        _;
    }

    function updateToken(address _tokenAddress) public restricted {
        tokenAddress = _tokenAddress;
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public payable restricted {
        require(_tokenSalePrice > 0, "Selling price must be greater than 0.");
        tokenSalePrice = _tokenSalePrice;
    }

    function buyToken() public payable {

        require(msg.value > 0, "Transferred value must be greater than 0.");
        
        ERC20 token = ERC20(tokenAddress);
        uint256 tokensToBuy = msg.value / tokenSalePrice;

        uint256 contractTokenBalance = token.balanceOf(address(this));
        require(tokensToBuy <= contractTokenBalance, "Not enough tokens available for sale.");

        require(token.transfer(msg.sender, tokensToBuy), "Token transfer failed!");

        payable(manager).transfer(msg.value);
        soldTokens += tokensToBuy;
    }

    function getTokenDetails() public view returns(string memory name, string memory symbol, uint256 balance, uint256 supply, uint256 tokenPrice, address tokenaddress, uint256 soldtokens ) {
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress,
            soldTokens
        );
    }

    function whoAmI () public view returns(address sender) {
        return msg.sender;
    }

    function getUserTokenBalance(address _user) public view returns (uint256 userBalance) {
        ERC20 token = ERC20(tokenAddress);
        uint256 userbalance = token.balanceOf(_user);
        return userbalance;
    }

    function transferToManager() external payable {
        require(msg.value > 0, "Please pay more then 0 units");
        payable(manager).transfer(msg.value);
    }

    function transferEther(address _receiver) external payable {
        require(msg.value > 0, "Please pay more then 0 units");
        payable(_receiver).transfer(msg.value);
    }

    function checkICOTokenBalance() public view returns (uint256) {
        ERC20 token = ERC20(tokenAddress);
        return token.balanceOf(address(this));
}

    function checkManagerBalance () public restricted view returns (uint256) {
         ERC20 token = ERC20(tokenAddress);
        return token.balanceOf(manager);
    }

    function withdrawAllTokens () public restricted payable {
        ERC20 token = ERC20(tokenAddress);
        require(token.balanceOf(address(this)) > 0, "No token left to withdraw");
        token.transfer(manager, token.balanceOf(address(this)));
    }
}
