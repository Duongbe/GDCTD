require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Khởi tạo Web3 với Ganache
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // Port mặc định của Ganache

// Contract ABI và địa chỉ
const contractABI = [
	{
		"inputs": [],
		"name": "hoanTatGiaoDich",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "huyGiaoDich",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nguoiMua",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nguoiBan",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_trungGian",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "xacNhanGiaoDich",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nguoiBan",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nguoiBanXacNhan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nguoiMua",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nguoiMuaXacNhan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "soTien",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trangThai",
		"outputs": [
			{
				"internalType": "enum KyQuy.TrangThaiGiaoDich",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trungGian",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// API endpoint để lấy thông tin ví hiện tại
app.get('/api/wallet/connect', async (req, res) => {
    try {
        // Lấy địa chỉ từ query parameter
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Vui lòng cung cấp địa chỉ ví' });
        }

        // Lấy thông tin tài khoản
        const balance = await web3.eth.getBalance(address);
        const networkId = await web3.eth.net.getId();

        res.json({
            address: address,
            balance: web3.utils.fromWei(balance, 'ether'),
            networkId: networkId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint để lấy thông tin hợp đồng
app.get('/api/contract/info', async (req, res) => {
    try {
        const nguoiMua = await contract.methods.nguoiMua().call();
        const nguoiBan = await contract.methods.nguoiBan().call();
        const trungGian = await contract.methods.trungGian().call();
        const soTien = await contract.methods.soTien().call();
        const trangThai = await contract.methods.trangThai().call();
        const nguoiMuaXacNhan = await contract.methods.nguoiMuaXacNhan().call();
        const nguoiBanXacNhan = await contract.methods.nguoiBanXacNhan().call();

        res.json({
            nguoiMua,
            nguoiBan,
            trungGian,
            soTien,
            trangThai,
            nguoiMuaXacNhan,
            nguoiBanXacNhan
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint để xác nhận giao dịch
app.post('/api/contract/xacnhan', async (req, res) => {
    try {
        const { address } = req.body;
        const result = await contract.methods.xacNhanGiaoDich()
            .send({ from: address });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint để hoàn tất giao dịch
app.post('/api/contract/hoantat', async (req, res) => {
    try {
        const { address } = req.body;
        const result = await contract.methods.hoanTatGiaoDich()
            .send({ from: address });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API endpoint để hủy giao dịch
app.post('/api/contract/huy', async (req, res) => {
    try {
        const { address } = req.body;
        const result = await contract.methods.huyGiaoDich()
            .send({ from: address });
        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
    console.log(`Kết nối với Ganache tại http://127.0.0.1:7545`);
}); 