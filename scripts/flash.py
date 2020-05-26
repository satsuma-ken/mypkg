#!/usr/bin/env python
import roslib
import rospy
import wiringpi
from std_msgs.msg import Int32, String

chk1 = 0
chk2 = 0
chk3 = 0
chk4 = 0
debug = 0
# callback
def callback(message):
    global chk1
    global chk2
    global chk3
    global chk4
    global debug
    bin_str = '{:04b}'.format(message.data)
    rospy.logdebug('%s', bin_str)
    if bin_str[0] == '1':
        chk1 = 1
    else:
        chk1 = 0

    if bin_str[1] == '1':
        chk2 = 1
    else:
        chk2 = 0

    if bin_str[2] == '1':
        chk3 = 1
    else:
        chk3 = 0

    if bin_str[3] == '1':
        chk4 = 1
    else:
        chk4 = 0

    debug = message.data
        
# main
if __name__ == '__main__':
    rospy.init_node('flash', log_level=rospy.DEBUG)
    wiringpi.wiringPiSetupGpio()
    wiringpi.pinMode(11, 1)
    wiringpi.pinMode(8, 1)
    wiringpi.pinMode(20, 1)
    wiringpi.pinMode(21, 1)

    sub = rospy.Subscriber('detect_on', Int32, callback)
    pub = rospy.Publisher('detecting', String, queue_size=1)
    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        wiringpi.digitalWrite(11, chk1)
        wiringpi.digitalWrite(8, chk2)
        wiringpi.digitalWrite(20, chk3)
        wiringpi.digitalWrite(21, chk4)
        pub.publish('{:04b}'.format(debug))
        rate.sleep()

    wiringpi.digitalWrite(11, 0)
    wiringpi.digitalWrite(8, 0)
