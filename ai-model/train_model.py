import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import os

# Generate sample data if it doesn't exist
if not os.path.exists("expense_data.csv"):
    data = pd.DataFrame({
        'month_number': [1, 2, 3, 4, 5, 6],
        'amount': [1200, 1350, 1100, 1400, 1550, 1600]
    })
    data.to_csv("expense_data.csv", index=False)
    print("Created expense_data.csv")

data = pd.read_csv("expense_data.csv")

X = data[['month_number']]
y = data['amount']

model = LinearRegression()
model.fit(X, y)

pickle.dump(model, open("model.pkl", "wb"))
print("Model trained and saved as model.pkl")
