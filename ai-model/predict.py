import pickle
import sys
import os

if len(sys.argv) < 2:
    print("Error: Month number required")
    sys.exit(1)

try:
    month = int(sys.argv[1])
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    
    if not os.path.exists(model_path):
        print("Error: model.pkl not found. Please train the model first.")
        sys.exit(1)

    model = pickle.load(open(model_path, "rb"))
    prediction = model.predict([[month]])

    print(round(prediction[0], 2))
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
