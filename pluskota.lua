-- Srednia miesieczna liczba wypozyczonych ksiazek na przestrzeni dwoch lat
-- redis-cli -h redis-12530.c12.us-east-1-4.ec2.cloud.redislabs.com -p 12530 -a 1428571a --eval ./pluskota.lua
local sum2016=0
local rejestr2016 = redis.call('ZRANGE', 'rejestr_wypozyczen_2016', 0, -1, 'WITHSCORES')

for i=2, #rejestr2016, 2 do
  sum2016 = sum2016 + rejestr2016[i]
end

local sum2017=0
local rejestr2017 = redis.call('ZRANGE', 'rejestr_wypozyczen_2017', 0, -1, 'WITHSCORES')

for j=2, #rejestr2017, 2 do
  sum2017 = sum2017 + rejestr2017[j]
end

return ((sum2016 / 12) + (sum2017 / 12)) / 2
