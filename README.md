# Hệ Thống Giao Dịch Có Trung Gian Sử Dụng Blockchain

Đây là một hệ thống giao dịch phi tập trung với **trung gian bảo chứng**, được xây dựng trên nền tảng **Ethereum blockchain**. 
Hệ thống sử dụng **Ganache** để mô phỏng mạng Ethereum cục bộ, **MetaMask** để ký và gửi giao dịch, và **Smart Contract** để đảm bảo an toàn, minh bạch trong giao dịch giữa hai bên người dùng và trung gian.

---

## Thành phần hệ thống

### Blockchain & Dev Tools:
- **Ganache**: Blockchain giả lập để phát triển và test smart contract.
- **Truffle / Hardhat** *(tùy chọn)*: Deploy, compile và test smart contract.
- **Solidity**: Ngôn ngữ lập trình smart contract.
- **MetaMask**: Ví Web3 dùng để ký, gửi giao dịch và tương tác với dApp.

### Smart Contract:
- Contract bảo đảm có logic trung gian:
  - Người mua gửi tiền => khóa tạm trong contract
  - Người bán giao hàng
  - Trung gian xác nhận => giải phóng tiền cho người bán

### Giao diện Web:
- HTML/CSS/JS + Web3.js hoặc Ethers.js
- Kết nối MetaMask, hiển thị giao dịch và tương tác smart contract

---

##  Luồng hoạt động

1. **Người mua** tạo giao dịch & gửi ETH vào smart contract.
2. **Người bán** thực hiện giao hàng.
3. **Trung gian** xác nhận giao dịch hoàn tất.
4. Smart contract tự động chuyển tiền cho người bán.

##  cấu trúc thư mục
![image](https://github.com/user-attachments/assets/92d932fd-56cd-49f8-8abd-edb7e270ea62)

---

![image](https://github.com/user-attachments/assets/2ac99422-830e-4c24-b7bb-57c3f4b3d8e1)
![image](https://github.com/user-attachments/assets/942b1f9e-d595-43ad-8162-e4d238ebda6f)
![image](https://github.com/user-attachments/assets/3f3ea5f7-019f-440c-8b1c-55c31d7bd216)


