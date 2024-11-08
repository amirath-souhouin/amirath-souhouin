import json
import re
import random

# Base path with focus on bottom part. Replace with full path if needed.
base_path = "M0 161L10.3 175.3C20.7 189.7 41.3 218.3 62 208.8C82.7 199.3 103.3 151.7 124.2 162.2C145 172.7 166 241.3 186.8 258.5C207.7 275.7 228.3 241.3 249 211.5C269.7 181.7 290.3 156.3 311 163.3C331.7 170.3 352.3 209.7 373 237.5C393.7 265.3 414.3 281.7 435.2 262.5C456 243.3 477 188.7 497.8 166.7C518.7 144.7 539.3 155.3 560 184.3C580.7 213.3 601.3 260.7 622 278.3C642.7 296 663.3 284 684 262.5C704.7 241 725.3 210 746.2 209.3C767 208.7 788 238.3 808.8 247.8C829.7 257.3 850.3 246.7 871 228.5C891.7 210.3 912.3 184.7 933 192.2C953.7 199.7 974.3 240.3 995 232.2C1015.7 224 1036.3 167 1057 165C1077.7 163 1098.3 216 1119.2 235.2C1140 254.3 1161 239.7 1181.8 222.7C1202.7 205.7 1223.3 186.3 1244 173C1264.7 159.7 1285.3 152.3 1306 154.5C1326.7 156.7 1347.3 168.3 1368 192C1388.7 215.7 1409.3 251.3 1430.2 271.5C1451 291.7 1472 296.3 1492.8 288C1513.7 279.7 1534.3 258.3 1555 250.8C1575.7 243.3 1596.3 249.7 1617 229.3C1637.7 209 1658.3 162 1679 152.8C1699.7 143.7 1720.3 172.3 1741.2 188.7C1762 205 1783 209 1803.8 200C1824.7 191 1845.3 169 1866 155 1886.7 141 1907.3 135 1917.7 132L1928 129L1928 0L0 0Z"

# Helper function to add a small random variation to a number
def vary_y_coordinate(y_value, variation_range=5):
    return round(float(y_value) + random.uniform(-variation_range, variation_range), 1)

# Generate variations
variations = []
for _ in range(1000):
    # Find all y-coordinates using regex and vary them
    path_variation = re.sub(r'(\d+\.\d+|\d+)', 
                            lambda match: str(vary_y_coordinate(match.group())) 
                            if match.start() > len(base_path) - 100 else match.group(), 
                            base_path)
    variations.append(path_variation)

# Write variations to JSON
with open("assets/path-variations.json", "w") as json_file:
    json.dump({"paths": variations}, json_file, indent=2)

print("1000 path variations generated in path-variations.json")
