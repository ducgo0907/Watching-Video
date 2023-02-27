import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { ChannelCard, Videos } from './'
import { useParams } from "react-router-dom"
import { fetchFromApi } from "../utils/fetchFromApi"
const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null)
	const [videos, setVideos] = useState([])

	const { id } = useParams()
	
	useEffect(() => {
		fetchFromApi(`channels?part=snippet&id=${id}`)
			.then((data) => setChannelDetail(data.items[0]))
			
		fetchFromApi(`search?channelId=${id}&part=snippet&
		oder=date`)
		.then((data) => setVideos(data.items))
	}, [id])
	return (
		<Box minHeight="95vh">
			<Box>
				<div style={{
					background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,119,1) 56%, rgba(0,212,255,1) 100%)",
					zIndex: 10,
					height: '300px',
				}}/>
				<ChannelCard channelDetail={channelDetail} marginTop='-110px'/>
			</Box>
			<Box display="flex" p="2">
				<Box sx={{ mr: { sm: '100px' }}} />
					<Videos videos={videos} />
			</Box>
		</Box>
	)
}

export default ChannelDetail